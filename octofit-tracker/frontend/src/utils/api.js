export const getApiEndpoint = (resourcePath) => {
  const trimmedResource = resourcePath.replace(/^\/+|\/+$|\s+/g, '') || '';
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/`
    : 'http://localhost:8000/api/';
  return `${baseUrl}${trimmedResource}/`;
};
