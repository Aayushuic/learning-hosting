import * as soap from 'soap';

export const getSoapClient = async (wsdlUrl: string): Promise<soap.Client> => {
  try {
    const client = await soap.createClientAsync(wsdlUrl);
    client.setEndpoint(wsdlUrl.replace('http://', 'https://'));
    return client;
  } catch (error) {
    console.error('Error creating SOAP client:', error);
    throw error;
  }
};

export const callSoapMethod = async <T>(
  wsdlUrl: string,
  method: string,
  data: any
): Promise<T> => {
  const client = await getSoapClient(wsdlUrl);

  const methodName = `${method}Async`;
  if (typeof client[methodName] !== 'function') {
    throw new Error(`Method ${method} not found in SOAP service`);
  }

  try {
    const [result] = await client[methodName](data);
    return result as T;
  } catch (err) {
    console.error('SOAP error:', err);
    throw err;
  }
};
