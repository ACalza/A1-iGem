
import sys

dict = {
    'UUU': 'F',
    'UUC': 'F',
    'UUA': 'F',
    'UUG': 'F',
    'CUU': 'L',
    'CUC': 'L',
    'CUA': 'L',
    'CUG': 'L',
    'AUU': 'I',
    'AUC': 'I',
    'AUA': 'I',
    'AUG': 'M',
    'GUU': 'V',
    'GUC': 'V',
    'GUA': 'V',
    'GUG': 'V',
    'UCU': 'S',
    'UCC': 'S',
    'UCA': 'S',
    'UCG': 'S',
    'CCU': 'P',
    'CCC': 'P',
    'CCA': 'P',
    'CCG': 'P',
    'ACU': 'T',
    'ACC': 'T',
    'ACA': 'T',
    'ACG': 'T',
    'GCU': 'A',
    'GCC': 'A',
    'GCA': 'A',
    'GCG': 'A',
    'UAU': 'Y',
    'UAC': 'Y',
    'UAA': 'STOP',
    'UAG': 'STOP',
    'UGA': 'STOP',
    'CAU': 'H',
    'CAC': 'H',
    'CAA': 'Q',
    'CAG': 'Q',
    'AAU': 'N',
    'AAC': 'N',
    'AAA': 'K',
    'AAG': 'K',
    'GAU': 'D',
    'GAC': 'D',
    'GAA': 'E',
    'GAG': 'E',
    'UGU': 'C',
    'UGC': 'C',
    'UGG': 'W',
    'CGU': 'R',
    'CGC': 'R',
    'CGA': 'R',
    'CGG': 'R',
    'AGU': 'S',
    'AGC': 'S',
    'AGA': 'R',
    'AGG': 'R',
    'GGU': 'G',
    'GGC': 'G',
    'GGA': 'G',
    'GGG': 'G'
}


def RNA_to_AA(index, str):
    aa = ''
    for i in range(index + 2, len(txt), 3):
        try:
            temp = str[i-2] + str[i-1] + str[i]
            if(dict[temp] == 'STOP' or i > len(txt) - 3):
                index = i
                break

            aa += dict[temp]
        except KeyError:
            aa = ''
            break

    return aa
txt = sys.argv[1]
newTxt = ''
for char in txt:
    if(char == 'T'):
        newTxt += 'U'
    else:
        newTxt += char
index = newTxt.find('AUG')
for i in range(index, len(newTxt)):
    temp = RNA_to_AA(index, newTxt)
    index = newTxt.find('AUG', index + 3)
    if(temp == ''):
        break
    else:
        print(temp)






