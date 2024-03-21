import { Component, OnInit , ViewChild} from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mapCenter: google.maps.LatLngLiteral = { lat: 20.5937, lng: 78.9629 };
  mapZoom: number = 6;
  selectedState: string = '';
  filteredMarkers: Marker[] = [];
  selectedMarkerInfo: Marker | null = null;
  selectedMarkerPosition: google.maps.LatLngLiteral | undefined;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  infoWindowOpen: boolean = false; // Track whether the info window is open

  constructor() {}

  indianStates: string[] = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'
  ];

  markers: Marker[] = [
    { id: 1, name: 'User 1', city: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777, draggable: false, timestamp: this.getCurrentTimestamp(), status: 'Active', lastActiveTimestamp: '' },
    { id: 2, name: 'User 2', city: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707, draggable: false, timestamp: this.getCurrentTimestamp(), status: 'Active', lastActiveTimestamp: '' },
    { id: 3, name: 'User 3', city: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867, draggable: false, timestamp: this.getCurrentTimestamp(), status: 'Active', lastActiveTimestamp: '' },
    { id: 4, name: 'User 4', city: 'Bangalore', state: 'Karnataka', lat: 12.9716, lng: 77.5946, draggable: false, timestamp: this.getCurrentTimestamp(), status: 'Active', lastActiveTimestamp: '' },
    { id: 5, name: 'User 5', city: 'Delhi', state: 'Delhi', lat: 28.704060, lng: 77.102493, draggable: false, timestamp: this.getCurrentTimestamp(), status: 'Active', lastActiveTimestamp: '' },
    { id: 6, name: 'User 6', city: 'Pune', state: 'Maharashtra', lat: 18.520430, lng: 73.856743, draggable: false, timestamp: this.getCurrentTimestamp(), status: 'Active', lastActiveTimestamp: '' },
    { id: 7, name: 'User 7', city: 'Chandigarh', state: 'Punjab', lat: 30.7333, lng: 76.7794, draggable: false, timestamp: this.getCurrentTimestamp(), status: 'Active', lastActiveTimestamp: '' },
    { id: 8, name: 'User 8', city: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462, draggable: false, timestamp: this.getCurrentTimestamp(), status: 'Active', lastActiveTimestamp: '' },
    { id: 9, name: 'User 9', city: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873, draggable: false, timestamp: this.getCurrentTimestamp(), status: 'Active', lastActiveTimestamp: '' },
    { id: 10, name: 'User 10', city: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639, draggable: false, timestamp: this.getCurrentTimestamp(), status: 'Active', lastActiveTimestamp: '' }
  ];

  ngOnInit() {
    this.filteredMarkers = this.markers;
  }

  onStateChange(event: any) {
    this.selectedState = event.target.value;
    this.filteredMarkers = this.selectedState ? this.markers.filter(marker => marker.state === this.selectedState) : [];

    if (this.filteredMarkers.length > 0) {
      this.mapCenter = { lat: this.filteredMarkers[0].lat, lng: this.filteredMarkers[0].lng };
    } else {
      this.mapCenter = { lat: 20.5937, lng: 78.9629 }; // Default center if no markers found
    }
  }

  addMarker(event: google.maps.MapMouseEvent) {
    // Logic for adding a marker goes here
  }

  openInfoWindow(markerRef: MapMarker, marker: Marker) {
    if (!this.infoWindow) {
      console.error('Info window is undefined.');
      return;
    }
  
    if (!markerRef) {
      console.error('Marker reference is undefined.');
      return;
    }
  
    // Log user details to the console
    console.log('User details:', marker);
  
    // Close the info window if it's already open
    if (this.selectedMarkerInfo === marker) {
      this.infoWindow.close();
      this.selectedMarkerInfo = null;
      this.selectedMarkerPosition = undefined;
    } else {
      // Open the info window with new marker details
      this.selectedMarkerInfo = marker;
      this.selectedMarkerPosition = { lat: marker.lat, lng: marker.lng };
      this.infoWindow.open(markerRef);
    }
  }
  
  
  
  
  getCurrentTimestamp(): string {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return currentDate.toLocaleString('en-IN', options);
  }
}

interface Marker {
  id: number;
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  draggable: boolean;
  timestamp: string;
  lastActiveTimestamp?: string;
  status: 'Active' | 'Inactive';
}
