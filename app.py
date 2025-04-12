import os
import logging
from flask import Flask, render_template

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create and configure the app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "queens_garden_hotel_secret")

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/rooms')
def rooms():
    return render_template('rooms.html')

@app.route('/amenities')
def amenities():
    return render_template('amenities.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
