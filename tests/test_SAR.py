import pytest
import sys

#import relavant functions from SAR_V1.py
from SAR_v1 import print_workspace

def test_print_workspace(capsys):

    # Call print_workspace function with example workspace ID of 172
    print_workspace(172)

    # Capture the true result from the function
    true_result = capsys.readouterr()

    # Assert that the true result matches the expected result
    expected_result = "1000 Cups Specialty Coffee & Food\nCmo. de Ganapanes, 1\nDog cafe\nOverall Rating: 4.2\n"
    assert true_result.out == expected_result

