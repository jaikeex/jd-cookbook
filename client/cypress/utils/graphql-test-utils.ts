import { CyHttpMessages } from 'cypress/types/net-stubbing';

export const hasOperationName = (req: CyHttpMessages.IncomingHttpRequest, operationName: string) => {
  const { body } = req;
  return body.hasOwnProperty('operationName') && body.operationName === operationName;
};

export const aliasQuery = (req: CyHttpMessages.IncomingHttpRequest, operationName: string, response: any) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Query`;
    req.reply((res) => {
      res.body = response;
    });
  }
};

export const aliasMutation = (req: CyHttpMessages.IncomingHttpRequest, operationName: string, response: any) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Mutation`;
    req.reply((res) => {
      res.body = response;
    });
  }
};
