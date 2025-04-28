import os
import time
from utils import Report

def seg_test(seg, name, test_set):
    os.makedirs("result", exist_ok=True)
    start = time.time()
    with open(f'data/test_{test_set}.txt', 'r', encoding='utf8') as fin, \
         open(f'result/{test_set}.{name}', 'w', encoding='utf8') as fout:
        for line in fin:
            line = line.strip()
            if not line:
                fout.write('\n')
                continue
            words = seg.segment(line, name)
            fout.write(' '.join(words) + '\n')
    duration = time.time() - start
    return duration


def test_value(name, test_set):
    report = Report()
    with open(f'data/{test_set}.txt', 'r', encoding='utf8') as fref, \
         open(f'result/{test_set}.{name}', 'r', encoding='utf8') as fcan:
        reference_all = fref.readlines()
        candidate_all = fcan.readlines()

    ref_count = can_count = acc_count = 0
    for reference, candidate in zip(reference_all, candidate_all):
        reference = reference.strip()
        candidate = candidate.strip()
        ref_words_len, can_words_len, acc_word_len = report.compare_line(reference, candidate)
        ref_count += ref_words_len
        can_count += can_words_len
        acc_count += acc_word_len

    P = acc_count / can_count * 100 if can_count else 0
    R = acc_count / ref_count * 100 if ref_count else 0
    F1 = 2 * P * R / (P + R) if (P + R) else 0

    return round(P, 2), round(R, 2), round(F1, 2)
