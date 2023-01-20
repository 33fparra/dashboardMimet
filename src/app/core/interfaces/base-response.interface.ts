export interface BaseResponse<T = {}> {
   status: boolean;
   statusCode: number;
   description: string;
   data: T;
}

