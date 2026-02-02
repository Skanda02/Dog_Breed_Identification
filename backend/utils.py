import tensorflow as tf
IMG_SIZE = 224

# Create a function for preprocessing image
def process_image(image_path, img_size=IMG_SIZE):
  """
  Takes an image file path as input and turns the image into Tesor
  """

  # Read in am image file
  image = tf.io.read_file(image_path)

  # Turn the jpeg image into numerical Tensor with 3 colour channels(RGB)
  image = tf.image.decode_jpeg(image, channels=3)

  # Convert the colour channel values from 0-255 to 0-1 values
  image = tf.image.convert_image_dtype(image,tf.float32)

  # Resize the image to our desired value(224,224)
  image = tf.image.resize(image, size=[img_size, img_size])

  # Add batch Dimension so the shape becomes (1, 224, 224, 3)
  image = tf.expand_dims(image, axis=0)

  return image