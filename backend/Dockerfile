# Start with Python base image
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements first (Docker caches this layer)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your backend code
COPY . .

# Tell Docker which port Flask runs on
EXPOSE 5000

# Command to run when container starts
CMD ["python", "app.py"]
