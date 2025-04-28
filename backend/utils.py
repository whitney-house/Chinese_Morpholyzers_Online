class Report:
	def __init__(self):
		pass
		
	def compare_line(self, reference, candidate): # reference annotation
		ref_len = len(reference.replace(' ', ''))
		can_len = len(candidate.replace(' ', ''))

		# if ref_len != can_len:
			# print('error len')
			# return None
		
		ref_words = reference.split()
		can_words = candidate.split()
		
		ref_words_len = len(ref_words)
		can_words_len = len(can_words)
		
		ref_index = []
		index = 0
		for word in ref_words:
			word_index = [index]
			index += len(word)
			word_index.append(index)
			ref_index.append(word_index)
			
		can_index = []
		index = 0
		for word in can_words:
			word_index = [index]
			index += len(word)
			word_index.append(index)
			can_index.append(word_index)
			
		tmp = [val for val in ref_index if val in can_index]
		acc_word_len = len(tmp)
		
		return ref_words_len, can_words_len, acc_word_len