import Queue from "bull";

export const resumeQueue = new Queue("resume-queue", process.env.REDIS_URL);
