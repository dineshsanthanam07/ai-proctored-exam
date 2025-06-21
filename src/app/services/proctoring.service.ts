import { Injectable } from '@angular/core';
import * as faceapi from 'face-api.js';

@Injectable({
  providedIn: 'root'
})
export class ProctoringService {
  private videoElement!: HTMLVideoElement;
  private alertShown = false; // Prevents multiple alerts for the same issue

  constructor() {
    console.log('Proctoring Service Initialized');
  }

  async initializeProctoring(video: HTMLVideoElement): Promise<void> {
    this.videoElement = video;
    await this.loadFaceApiModels();
    await this.startWebcam();
    this.detectFaceAndOrientation();
  }

  private async loadFaceApiModels(): Promise<void> {
    await faceapi.nets.tinyFaceDetector.loadFromUri('assets/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('assets/models');
    console.log('Face API Models Loaded');
  }

  private async startWebcam(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      this.videoElement.srcObject = stream;
      this.videoElement.play();
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  }

  private async detectFaceAndOrientation(): Promise<void> {
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(
        this.videoElement,
        new faceapi.TinyFaceDetectorOptions()
      ).withFaceLandmarks();

      if (!detections || detections.length === 0) {
        console.log('No face detected! User might have moved away.');
        this.triggerAlert('Face not detected! Please stay in front of the camera.');
        return;
      }

      if (detections.length > 1) {
        console.log('Multiple faces detected! Possible malpractice.');
        alert('Multiple faces detected! Exam rules violation.');
        this.triggerAlert('Multiple faces detected! Exam rules violation.');
        return;
      }

      // Process the detected face for orientation
      const detection = detections[0];
      const landmarks = detection.landmarks;
      const nose = landmarks.getNose()[3]; // Middle point of nose
      const leftEye = landmarks.getLeftEye()[0]; // Leftmost point of left eye
      const rightEye = landmarks.getRightEye()[3]; // Rightmost point of right eye

      // Calculate head orientation using nose and eye positions
      const faceCenter = (leftEye.x + rightEye.x) / 2;
      const noseOffset = nose.x - faceCenter;

      if (noseOffset > 25) {
        this.triggerAlert('Head turned **right** too much! Please face forward.');
      } else if (noseOffset < -25) {
        this.triggerAlert('Head turned **left** too much! Please face forward.');
      } else {
        this.alertShown = false; // Reset alert flag when facing forward
        console.log('Face detected, looking straight.');
      }
    }, 2000);
}


  private triggerAlert(message: string): void {
    if (!this.alertShown) {
      alert(message);
      this.alertShown = true; // Prevents multiple alerts
    }
  }
}
