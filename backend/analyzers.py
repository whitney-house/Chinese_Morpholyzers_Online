"""A class for importing several popular Chinese morphology analysers,
    focusing on segmentation only.
"""
import jieba
from snownlp import SnowNLP
import sys
import os
import contextlib
import thulac
import hanlp
from ltp import LTP


@contextlib.contextmanager
def suppress_stdout_stderr():
    """No library logging"""
    with open(os.devnull, 'w') as fnull:
        old_stdout = sys.stdout
        old_stderr = sys.stderr
        sys.stdout = fnull
        sys.stderr = fnull
        try:
            yield
        finally:
            sys.stdout = old_stdout
            sys.stderr = old_stderr


class Analyzers:
    def __init__(self):
        #Initialise some analysers
        jieba.setLogLevel(jieba.logging.WARN) # No logging 
        self._thu = None
        self._hanlp = None
        self._ltp = None
        self._snow = None
        
        self.models_dir = "models"
        self.thulac_model_path = os.path.join(self.models_dir, "thulac")
        self.ltp_model_path = os.path.join(self.models_dir, "ltp", "small")  
        self.hanlp_model_path = os.path.join(self.models_dir, "hanlp","fine_small") 

    def segment(self, text: str, analyzer: str):
        text = text.strip()
        if analyzer == "jieba":
            return list(jieba.cut(text))

        elif analyzer == "THULAC":
            if self._thu is None:
                
                with suppress_stdout_stderr():
                    self._thu = thulac.thulac(seg_only=True, model_path=self.thulac_model_path)
                    print("THULAC loading ok")
            return self._thu.cut(text, text=True).split()

        elif analyzer == "HanLp":
            if self._hanlp is None:
                
                self._hanlp = hanlp.load(self.hanlp_model_path)
                print("Hanlp loading ok")
            return self._hanlp(text)
        

        elif analyzer == "LTP":
            if self._ltp is None:
                
                with suppress_stdout_stderr():
                    self._ltp = LTP(self.ltp_model_path)
                    print("LTPloading ok")
            result = self._ltp.pipeline([text], tasks=["cws"])
            return result.cws[0]
     

        elif analyzer == "snowNLP":
            s = SnowNLP(text)
            return s.words

        else:
            raise ValueError(f"Unknown analyzer: {analyzer}")

# if __name__ == "__main__":
#     analyzer = Analyzers()
    
#     text = "今天天气真好，适合出去玩！"

#     for tool in ["jieba", "THULAC", "HanLp", "LTP", "snowNLP"]:
#         print(f"=== Testing {tool} ===")
#         try:
#             result = analyzer.segment(text, tool)
#             print(result)
#         except Exception as e:
#             print(f"Error testing {tool}: {e}")
