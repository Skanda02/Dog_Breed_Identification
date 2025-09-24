# End-to-end Multi-class Dog Breed Classification

This notebook builds an end-to-end multi-class image classifier using **TensorFlow 2.x** and **TensorFlow Hub**.

---

## 1. Problem

Identifying the breed of a dog given an image of a dog.

---

## 2. Data

The dataset is from Kaggle’s **Dog Breed Identification** competition:  
[https://www.kaggle.com/c/dog-breed-identification/data](https://www.kaggle.com/c/dog-breed-identification/data)

---

## 3. Evaluation

The evaluation metric is based on a file with **prediction probabilities** for each dog breed of each test image.  
More details: [Competition Evaluation](https://www.kaggle.com/c/dog-breed-identification/overview/evaluation)

---

## 4. Features

Some key information about the data:

- We're dealing with **images (unstructured data)**, so it's best to use **deep learning/transfer learning**.
- There are **120 breeds of dogs** (i.e., 120 different classes).
- There are around **10,000+ labeled images** in the training set.
- There are around **10,000+ unlabeled images** in the test set (to be predicted).

---
