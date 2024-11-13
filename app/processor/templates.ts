const templates = [
  {
    name: 'We will be working here (placeholders)',
    value:
      '{\n' + '  "title": "Welcome to {{siteName}}",\n' + '  "text": "We will be working here from {{siteStartDate}} to {{siteEndDate}}."\n' + '}',
  },
  {
    name: 'Room names ($if condition)',
    value:
      '{\n' +
      '  "areas": [\n' +
      '    {\n' +
      '      "name": "Lobby",\n' +
      '      "description": "The lobby of the building."\n' +
      '    },\n' +
      '    {\n' +
      '      "name": "Kitchen",\n' +
      '      "description": "The kitchen of the building."\n' +
      '    },\n' +
      '    {\n' +
      '      "$if": "{{hasConferenceRoom}}",\n' +
      '      "name": "Conference room",\n' +
      '      "description": "The conference room of the building."\n' +
      '    }\n' +
      '  ]\n' +
      '}',
  },
  {
    name: 'Induction Form ($for loop)',
    value:
      '{\n' +
      '  "name": "Induction Form",\n' +
      '  "sections": [\n' +
      '    {\n' +
      '      "type": "text",\n' +
      '      "title": "Introduction",\n' +
      '      "content": "Welcome to the induction form for Google. Please fill out the following information so that we can get to know you better."\n' +
      '    },\n' +
      '    {\n' +
      '      "type": "staff",\n' +
      '      "staff": {\n' +
      '        "$for": {\n' +
      '          "collection": "staffList",\n' +
      '          "produce": {\n' +
      '            "name": "{{name}}",\n' +
      '            "email": "{{username}}@google.com"\n' +
      '          }\n' +
      '        }\n' +
      '      }\n' +
      '    }\n' +
      '  ]\n' +
      '}',
  },
  {
    name: 'Everything',
    value:
      '{\n' +
      '\n"--- Test 1 ---":\n' +
      '{\n' +
      '  "areas": [\n' +
      '    {\n' +
      '      "name": "Lobby",\n' +
      '      "description": "The lobby of the building."\n' +
      '    },\n' +
      '    {\n' +
      '      "name": "Kitchen",\n' +
      '      "description": "The kitchen of the building."\n' +
      '    },\n' +
      '    {\n' +
      '      "$if": "{{hasConferenceRoom}}",\n' +
      '      "name": "Conference room",\n' +
      '      "description": "The conference room of the building."\n' +
      '    }\n' +
      '  ]\n' +
      '},' +
      '\n"--- Test 2 ---":\n' +
      '{\n' +
      '  "areas": [\n' +
      '    {\n' +
      '      "name": "Lobby",\n' +
      '      "description": "The lobby of the building."\n' +
      '    },\n' +
      '    {\n' +
      '      "name": "Kitchen",\n' +
      '      "description": "The kitchen of the building."\n' +
      '    },\n' +
      '    {\n' +
      '      "$if": "{{hasConferenceRoom}}",\n' +
      '      "name": "Conference room",\n' +
      '      "description": "The conference room of the building."\n' +
      '    }\n' +
      '  ]\n' +
      '},' +
      '\n"--- Test 3 ---":\n' +
      '{\n' +
      '  "name": "Induction Form",\n' +
      '  "sections": [\n' +
      '    {\n' +
      '      "type": "text",\n' +
      '      "title": "Introduction",\n' +
      '      "content": "Welcome to the induction form for Google. Please fill out the following information so that we can get to know you better."\n' +
      '    },\n' +
      '    {\n' +
      '      "type": "staff",\n' +
      '      "staff": {\n' +
      '        "$for": {\n' +
      '          "collection": "staffList",\n' +
      '          "produce": {\n' +
      '            "name": "{{name}}",\n' +
      '            "email": "{{username}}@google.com"\n' +
      '          }\n' +
      '        }\n' +
      '      }\n' +
      '    }\n' +
      '  ]\n' +
      '}' +
      '}',
  },
];

export default templates;
