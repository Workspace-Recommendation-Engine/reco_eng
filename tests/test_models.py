import pytest
import sys

#import relavant functions from SAR_V1.py
from SAR_v1 import print_workspace

#import relavant functions from KNN.py
from KNN import predict_score

# Pytest for print_workspace() in SAR model file
def test_print_workspace(capsys):

    # Call print_workspace function with example workspace ID of 172
    print_workspace(172)

    # Capture the true result from the function
    true_result = capsys.readouterr()

    # Assert that the true result matches the expected result
    expected_result = "1000 Cups Specialty Coffee & Food\nCmo. de Ganapanes, 1\nDog cafe\nOverall Rating: 4.2\n"
    assert true_result.out == expected_result


# Pytest for predict_score() in KNN model file
def test_predict_score(capsys):

    # Call predict_score function
    predict_score()

    # Capture the true result from the function
    true_result = capsys.readouterr()
    print(true_result)

    # Assert that the true result matches the expected result
    expected_result = "Selected Location:  Harina\n\nRecommended Workspaces: \n\nIndex:  97 \nName:  Randall Coffee Roasters \nRating:  4.7\nIndex:  98 \nName:  Hola Coffee Fourquet \nRating:  4.4\nIndex:  99 \nName:  Santa Kafeina \nRating:  4.8\nIndex:  100 \nName:  Urbano Specialty Coffee \nRating:  4.5\nIndex:  101 \nName:  East Crema Coffee - Hermosilla (Specialty Coffee Café de especialidad en Madrid) \nRating:  4.6\nIndex:  102 \nName:  Bianchi Kiosko Caffé \nRating:  4.7\nIndex:  105 \nName:  The Fix - Café de Especialidad \nRating:  4.6\nIndex:  106 \nName:  Luso Coffee Shop | Madrid \nRating:  4.4\nIndex:  173 \nName:  Randall Coffee Roasters \nRating:  4.7\nIndex:  176 \nName:  Taruffi \nRating:  4.1\n"
    assert true_result.out == expected_result


