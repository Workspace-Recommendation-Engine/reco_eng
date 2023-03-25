import pytest 

##dummy test to get it to work on github
@pytest.fixture
def func(x):
    return x + 1


def test_answer():
    assert func(4) == 5