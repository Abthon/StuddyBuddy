from PIL import Image
from django.core.exceptions import ValidationError
import os


def validate_icon_image_size(image):
	if image:
		with Image.open(image) as img:
			if img.width > 70 or img.height > 70:
				raise ValidationError(f"The maximum allowed dimension for image is 70 x 70, but size of the image you uploded is {img.size}")


def validate_image_file_extension(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = [".jpeg", ".gif", ".jpg", ".png"]
    if ext not in valid_extensions:
        raise ValidationError("Unsupported file extension")