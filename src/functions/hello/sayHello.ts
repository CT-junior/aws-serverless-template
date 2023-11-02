import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import { ok } from "src/utils/Returns";

const sayHello = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

  const dbteste = new RoomsRepositories();
  await dbteste.findAll();

  return ok("message", "Hello World!");
};

export const handler = Handler(sayHello);