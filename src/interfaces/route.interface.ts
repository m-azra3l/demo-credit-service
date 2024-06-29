// Import the Router class from 'express' to type the router property
import { Router } from 'express';

// Define the Routes interface to type the structure of route classes
export interface Routes {
  path?: string; // Optional property to specify the base path for the routes
  router: Router; // Router instance to define the routes
};