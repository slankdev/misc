FROM node:latest

# Install the MCP Inspector package
RUN npm install -g @modelcontextprotocol/inspector

# Set working directory
WORKDIR /app

# Command to run the inspector
CMD ["npx", "@modelcontextprotocol/inspector"]
