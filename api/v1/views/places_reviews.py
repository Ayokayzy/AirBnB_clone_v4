#!/usr/bin/python3
"""
route for handling Review objects and operations
"""
from flask import jsonify, abort, request
from api.v1.views import app_views, storage
from models.review import Review


@app_views.route("/places/<place_id>/reviews", methods=["GET"],
                 strict_slashes=False)
def get_place_review(place_id):
    """
    retrieves all Review objects by city
    :return: json of all Review
    """
    review_list = []
    place_obj = storage.get("Place", str(place_id))
    for obj in place_obj.reviews:
        review_list.append(obj.to_dict())

    return jsonify(review_list)


@app_views.route("/places/<place_id>/reviews", methods=["POST"],
                 strict_slashes=False)
def place_review(place_id):
    """
    create review route
    :return: newly created Review obj
    """
    review_json = request.get_json(silent=True)
    if review_json is None:
        abort(400, 'Not a JSON')
    if not storage.get("Place", place_id):
        abort(404)
    if "user_id" not in review_json:
        abort(400, 'Missing user_id')
    if not storage.get("User", review_json["user_id"]):
        abort(404)
    if "text" not in review_json:
        abort(400, 'Missing text')

    new_review = Review(**review_json, place_id=place_id)
    new_review.save()
    resp = jsonify(new_review.to_dict())
    resp.status_code = 201

    return resp


@app_views.route("/reviews/<review_id>",  methods=["GET"],
                 strict_slashes=False)
def get_review(review_id):
    """
    gets a specific Review object by ID
    :param review_id: review object id
    :return: review obj with the specified id or error
    """

    fetched_obj = storage.get("Review", str(review_id))

    if fetched_obj is None:
        abort(404)

    return jsonify(fetched_obj.to_dict())


@app_views.route("/reviews/<review_id>",  methods=["PUT"],
                 strict_slashes=False)
def update_review(review_id):
    """
    updates specific Review object by ID
    :param review_id: Review object ID
    :return: Review object and 200 on success, or 400 or 404 on failure
    """
    review_json = request.get_json(silent=True)

    if review_json is None:
        abort(400, 'Not a JSON')

    fetched_obj = storage.get("Review", str(review_id))

    if fetched_obj is None:
        abort(404)

    for key, val in review_json.items():
        if key not in [
            "id",
            "created_at",
            "updated_at",
            "user_id",
            "place_id"
        ]:
            setattr(fetched_obj, key, val)

    fetched_obj.save()

    return jsonify(fetched_obj.to_dict())


@app_views.route("/reviews/<review_id>",  methods=["DELETE"],
                 strict_slashes=False)
def delete_place_review(review_id):
    """
    deletes Review by id
    :param review_id: review object id
    :return: empty dict with 200 or 404 if not found
    """

    fetched_obj = storage.get("Review", str(review_id))

    if fetched_obj is None:
        abort(404)

    storage.delete(fetched_obj)
    storage.save()

    return jsonify({})
