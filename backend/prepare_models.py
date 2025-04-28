import os
import sys
import thulac
import shutil
import subprocess

# Create working dir
os.makedirs('./models/thulac', exist_ok=True)
os.makedirs('./models/hanlp', exist_ok=True)


	
print("Loading THULAC...")
try:
  
    thu = thulac.thulac(seg_only=True)
    thu.cut("Test")

    import inspect
    thulac_module = inspect.getfile(thulac)
    thulac_dir = os.path.dirname(thulac_module)
    
    # The models wokr dir
    possible_locations = [
        os.path.expanduser("~/.thulac"),
        os.path.join(thulac_dir, "models"),
        os.path.join(os.path.dirname(thulac_dir), "thulac", "models")
    ]
    
    found = False
    for loc in possible_locations:
        if os.path.exists(loc):
            print(f"Find THULAC modle dir: {loc}")
            for item in os.listdir(loc):
                src = os.path.join(loc, item)
                dst = os.path.join('./models/thulac', item)
                if os.path.isfile(src):
                    shutil.copy2(src, dst)
                elif os.path.isdir(src):
                    shutil.copytree(src, dst, dirs_exist_ok=True)
            found = True
            print("THULAC copy successfully")
            break
    
    if not found:
        print("Trying looking for THULAC")
       
        for root, dirs, files in os.walk(os.path.dirname(thulac_dir)):
            for file in files:
                if file.endswith(".bin") or file.endswith(".dat"):
                    src = os.path.join(root, file)
                    dst = os.path.join('./models/thulac', file)
                    shutil.copy2(src, dst)
                    print(f"Copy: {file}")
                    found = True
        
        if found:
            print("THULAC copy successfully")
        else:
            print("Cannot find any THULAC model")
except Exception as e:
    print(f"THULAC moel loading failed: {e}")

print("Loading THULAC...")
try:
    

    # Requirements must be downloaded
    import hanlp
    
    # Download tokenizer
    tokenizer = hanlp.load(hanlp.pretrained.tok.FINE_ELECTRA_SMALL_ZH)
    
    # Test model
    test_result = tokenizer("Test HnaLp")
    print(f"HanLP reuslt: {test_result}")
    
 
    hanlp_home = os.path.expanduser("~/.hanlp")
    if os.path.exists(hanlp_home):
        print(f"Find HanLP model dir: {hanlp_home}")
     
        tok_dir = os.path.join(hanlp_home, "tok")
        if os.path.exists(tok_dir):
            for item in os.listdir(tok_dir):
                src = os.path.join(tok_dir, item)
                dst = os.path.join('./models/hanlp', item)
                if os.path.isfile(src):
                    shutil.copy2(src, dst)
                elif os.path.isdir(src):
                    shutil.copytree(src, dst, dirs_exist_ok=True)
            print("HanLp copy successfully")
        else:
            print(f"No HanLP tok found: {tok_dir}")
    else:
        print(f"No HanLP dier found: {hanlp_home}")
except Exception as e:
    print(f"HanLP model failed to download: {e}")

print("Modles done！")