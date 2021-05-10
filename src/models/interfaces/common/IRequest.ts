import express from "express";


export interface IRequest extends express.Request {
    requestId: string;
    userId?: any;
    context?: any;
  }