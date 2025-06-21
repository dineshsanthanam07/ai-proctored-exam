import { Component, OnInit } from '@angular/core';
import Peer from 'peerjs';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-exam-monitoring',
  templateUrl: './exam-monitoring.component.html',
  styleUrls: ['./exam-monitoring.component.css']
})
 export class ExamMonitoringComponent 
 implements OnInit {
  peer: any;
  adminPeerId = 'admin-peer-id'; // Set the Admin ID manually or fetch dynamically
  studentStreams: any[] = []; // Array to store student video streams

  constructor() {}

  ngOnInit() {
    console.log('Exam Monitoring Component Initialized');
    this.peer = new Peer(this.adminPeerId); // Initialize PeerJS with Admin ID

    this.peer.on('call', (call: { answer: () => void; on: (arg0: string, arg1: (remoteStream: any) => void) => void; }) => {
      call.answer(); // Accept the student's screen stream

      call.on('stream', (remoteStream) => {
        this.studentStreams.push(remoteStream); // Add student stream to UI
      });
    });
  }
}