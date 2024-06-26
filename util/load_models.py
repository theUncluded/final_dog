import pathlib
import platform
import os
from fastai.vision.all import load_learner
from transformers import pipeline
from openai import OpenAI

def load_emotion_classifier():
    """
    Loads in a pre-trained CNN stored as model.pkl in the model directory
    The specific model loaded is resnetaa50d.sw_in12k_ft_in1k, that was fine-tuned by us on two different dog emotion image datasets
    Returns the loaded model
    """
    model_path = pathlib.Path('model/model.pkl')
    if platform.system() == 'Windows':
        # Use WindowsPath on Windows machines
        posix_backup = pathlib.PosixPath
        try:
            pathlib.PosixPath = pathlib.WindowsPath
            model = load_learner(model_path)
        finally:
            pathlib.PosixPath = posix_backup
    else:
        # Use default PosixPath on other operating systems
        model = load_learner(model_path)
    return model

def load_image_to_text():
    """
    Loads in a pre-trained image-to-text model from the transformers libary
    The specific model loaded is the vit-gpt2-image-captioning model
    Returns the loaded model
    """
    pipe = pipeline("object-detection", model="hustvl/yolos-tiny")
    return pipe


def load_gpt3():
    """
    Connects to OpenAI's API with an API key stored in a gpt_api.txt file
    """
    API_KEY = os.getenv("OPENAI_API_KEY")
    client = OpenAI()
    return client
