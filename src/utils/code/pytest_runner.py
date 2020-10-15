# Importing tests
import json
import os
import pytest
import sys
import importlib.util
sys.dont_write_bytecode = True

# TEST ENVIROMENT
'''
os.environ['TMP_DIR'] = '/home/fpc-deb/Git/Ceub-DBot/src/tmp'
os.environ['CHALLENGE_FILE'] = '/home/fpc-deb/Git/Ceub-DBot/src/tmp/0000001.challenge.json'
os.environ['USER_FILE'] = '/home/fpc-deb/Git/Ceub-DBot/src/tmp/41979351.py'
os.environ['USER_MODULE'] = '41979351'
'''

tmp_dir_path = os.environ['TMP_DIR']
challenge_file = os.environ['CHALLENGE_FILE']
user_file = os.environ['USER_FILE']
user_module = os.environ['USER_MODULE']

json_file = open(challenge_file , 'r')
data = json.load(json_file)
testes = data['testes']

# Import function
spec = importlib.util.spec_from_file_location(user_module, user_file)
foo = importlib.util.module_from_spec(spec)
spec.loader.exec_module(foo)
user_function = getattr(foo, 'soma')

casos = []
for teste in testes:
    casos.append((teste['entrada'],teste['saida']))

@pytest.mark.parametrize("test_input,test_output", casos)
def test_eval(test_input, test_output):
    assert user_function(test_input) == test_output