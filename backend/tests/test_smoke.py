import os

import pytest

import app as app_module

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


@pytest.fixture(scope="module")
def client():
    app_module.app.config["TESTING"] = True
    return app_module.app.test_client()


def test_health(client):
    resp = client.get("/api/health")
    assert resp.status_code == 200
    assert resp.get_json()["status"] == "ok"


def test_health_alias(client):
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.get_json()["status"] == "ok"


def test_breeds(client):
    resp = client.get("/api/breeds")
    assert resp.status_code == 200
    data = resp.get_json()
    assert data["count"] == 120
    assert len(data["breeds"]) == 120


def test_predict(client):
    image_path = os.path.join(ROOT, "Sample.jpg")
    assert os.path.isfile(image_path), f"Sample image missing: {image_path}"
    with open(image_path, "rb") as f:
        resp = client.post(
            "/api/predict",
            data={"image": (f, "Sample.jpg")},
            content_type="multipart/form-data",
        )
    assert resp.status_code == 200
    data = resp.get_json()
    assert data["breed"]
    assert 0 <= data["confidence"] <= 100
    assert len(data["topPredictions"]) == 5


def test_predict_missing_image(client):
    resp = client.post("/api/predict", data={})
    assert resp.status_code == 400
