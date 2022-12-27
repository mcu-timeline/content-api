import { PathSegment } from 'neo4j-driver';

type Segment = PathSegment & {
  start: {
    properties: {
      title: string;
      duration: string;
    };
  };
};

export const isValidPathSegment = (segment: PathSegment): segment is Segment =>
  typeof segment.start.properties === 'object' &&
  typeof segment.start.properties.title === 'string' &&
  typeof segment.start.properties.duration === 'string';
