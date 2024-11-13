import processTemplateOrig, { Options, Variables } from './templateProcessor';

// Adding a parameter to test objects //
const processTemplate = (template: string, variables: Variables, options: Options = {}) => {
  options.returnType = 'object';
  return processTemplateOrig(template, variables, options);
};

describe('templateProcessor: Basic tests', () => {
  it('1. should return the template with the variables substituted', async () => {
    expect(processTemplate('{}', {})).toEqual({});
  });
});

describe('templateProcessor: Placeholder ({{var}}) tests', () => {
  it('2. should replace variables in a simple template', () => {
    const template = '{"name": "{{name}}", "age": "{{age}}"}';
    const variables = { name: 'John', age: 30 };
    expect(processTemplate(template, variables)).toEqual({ name: 'John', age: 30 });
  });

  it('3. should replace multiple occurrences of the same variable', () => {
    const template = '{"greeting": "Hello {{name}}! Welcome, {{name}}!"}';
    const variables = { name: 'Alice' };
    expect(processTemplate(template, variables)).toEqual({ greeting: 'Hello Alice! Welcome, Alice!' });
  });

  it('4. should leave unreplaced variables as is when placeholdersLeaveAsIs is true', () => {
    const template = '{"name": "{{name}}", "city": "{{city}}"}';
    const variables = { name: 'Bob' };
    expect(processTemplate(template, variables)).toEqual({ name: 'Bob', city: '{{city}}' });
  });

  it('5. should remove unreplaced variables when placeholdersLeaveAsIs is false', () => {
    const template = '{"name": "{{name}}", "city": "{{city}}"}';
    const variables = { name: 'Charlie' };
    expect(processTemplate(template, variables, { placeholdersLeaveAsIs: false })).toEqual({ name: 'Charlie', city: '' });
  });
});

describe('templateProcessor: Conditional ($if) tests', () => {
  it('6. should include content when $if condition is true', () => {
    const template = '{"data": {"$if": "{{showData}}", "value": "secret"}}';
    const variables = { showData: true };
    expect(processTemplate(template, variables)).toEqual({ data: { value: 'secret' } });
  });

  it('7. should exclude content when $if condition is false', () => {
    const template = '{"data": {"$if": "{{showData}}", "value": "secret"}}';
    const variables = { showData: false };
    expect(processTemplate(template, variables)).toEqual({});
  });

  it('8. should handle nested $if conditions', () => {
    const template = '{"outer": {"$if": "{{outerCondition}}", "inner": {"$if": "{{innerCondition}}", "value": "nested"}}}';
    const variables = { outerCondition: true, innerCondition: true };
    expect(processTemplate(template, variables)).toEqual({ outer: { inner: { value: 'nested' } } });
  });

  it('9. should handle $if conditions with variable substitution', () => {
    const template = '{"result": {"$if": "{{value}} === 42", "message": "Correct!"}}';
    const variables = { value: 42 };
    expect(processTemplate(template, variables)).toEqual({ result: { message: 'Correct!' } });
  });
});

describe('templateProcessor: Loop ($for) tests', () => {
  it('10. should process a simple $for loop', () => {
    const template = `{
  "items": {
    "$for": {
      "collection": "numbers",
      "produce": {
        "value": "{{item}}"
      }
    }
  }
}`;
    const variables = { numbers: [{ item: 1 }, { item: 2 }, { item: 3 }] };
    expect(processTemplate(template, variables)).toEqual({ items: [{ value: 1 }, { value: 2 }, { value: 3 }] });
  });

  it('11. should handle nested properties in $for loop', () => {
    const template = `{
  "users": {
    "$for": {
      "collection": "people",
      "produce": {
        "name": "{{name}}",
        "details": {
          "age": "{{age}}"
        }
      }
    }
  }
}`;
    const variables = {
      people: [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
      ],
    };
    expect(processTemplate(template, variables)).toEqual({
      users: [
        { name: 'Alice', details: { age: 30 } },
        { name: 'Bob', details: { age: 25 } },
      ],
    });
  });

  it('12. should handle empty collections in $for loop', () => {
    const template = '{"items": {"$for": {"collection": "emptyList", "produce": {"value": "{{item}}"}}}}';
    const variables = { emptyList: [] };
    expect(processTemplate(template, variables)).toEqual({ items: [] });
  });

  it('13. should handle $for loop with conditional', () => {
    const template = '{"items": {"$for": {"collection": "numbers", "produce": {"$if": "{{item}}", "value": "{{item}}"}}}}';
    const variables = { numbers: [{ smth: 1 }, { smth: 2 }, { item: 3 }, { item: 4 }, { item: 5 }] };
    expect(processTemplate(template, variables)).toEqual({ items: [{ value: 3 }, { value: 4 }, { value: 5 }] });
  });
});

describe('templateProcessor: Combined feature tests', () => {
  it('14. should handle variable substitution inside $for loop', () => {
    const template = '{"list": {"$for": {"collection": "items", "produce": {"name": "Item {{item}}", "id": "ID-{{item}}"}}}}';
    const variables = { items: [{ item: 'A' }, { item: 'B' }, { item: 'C' }] };
    expect(processTemplate(template, variables)).toEqual({
      list: [
        { name: 'Item A', id: 'ID-A' },
        { name: 'Item B', id: 'ID-B' },
        { name: 'Item C', id: 'ID-C' },
      ],
    });
  });

  it('15. should handle $if condition inside $for loop', () => {
    const template =
      '{"users": {"$for": {"collection": "people", "produce": {"name": "{{name}}", "status": {"$if": "{{age}}", "value": "Age: {{age}}"}}}}}';
    const variables = {
      people: [{ name: 'Alice', age: 20 }, { name: 'Bob' }],
    };
    expect(processTemplate(template, variables)).toEqual({
      users: [{ name: 'Alice', status: { value: 'Age: 20' } }, { name: 'Bob' }],
    });
  });

  it('16. should handle nested $for loops', () => {
    const template =
      '{"departments": {"$for": {"collection": "depts", "produce": {"name": "{{name}}", "employees": {"$for": {"collection": "employees", "produce": {"id": "{{id}}"}}}}}}}';
    const variables = {
      depts: [
        { name: 'HR', employees: [{ id: 1 }, { id: 2 }] },
        { name: 'IT', employees: [{ id: 3 }, { id: 4 }] },
      ],
    };
    expect(processTemplate(template, variables)).toEqual({
      departments: [
        { name: 'HR', employees: [{ id: 1 }, { id: 2 }] },
        { name: 'IT', employees: [{ id: 3 }, { id: 4 }] },
      ],
    });
  });

  it('17. should handle complex nested structure with all features', () => {
    const template = `{
      "company": "{{companyName}}",
      "departments": {
        "$for": {
          "collection": "depts",
          "produce": {
            "name": "{{name}}",
            "manager": "{{manager}}",
            "employees": {
              "$for": {
                "collection": "employees",
                "produce": {
                  "name": "{{name}}",
                  "position": "{{position}}",
                  "isFullTime": {
                    "$if": "{{fullTime}}",
                    "value": true
                  }
                }
              }
            }
          }
        }
      }
    }`;
    const variables = {
      companyName: 'TechCorp',
      depts: [
        {
          name: 'Engineering',
          manager: 'Alice',
          hasEmployees: true,
          employees: [
            { name: 'Bob', position: 'Developer', fullTime: true },
            { name: 'Charlie', position: 'Designer', fullTime: false },
          ],
        },
        {
          name: 'Marketing',
          manager: 'David',
          hasEmployees: false,
        },
      ],
    };
    expect(processTemplate(template, variables)).toEqual({
      company: 'TechCorp',
      departments: [
        {
          name: 'Engineering',
          manager: 'Alice',
          employees: [
            { name: 'Bob', position: 'Developer', isFullTime: { value: true } },
            { name: 'Charlie', position: 'Designer' },
          ],
        },
        {
          name: 'Marketing',
          manager: 'David',
        },
      ],
    });
  });
});

describe('templateProcessor: edge cases', () => {
  it('18. should handle empty template', () => {
    expect(processTemplate('{}', {})).toEqual({});
  });

  it('19. should handle template with only variables', () => {
    const template = '{"v1": "{{var1}}", "v2": "{{var2}}", "v3": "{{var3}}"}';
    const variables = { var1: 'a', var2: 'b', var3: 'c' };
    expect(processTemplate(template, variables)).toEqual({ v1: 'a', v2: 'b', v3: 'c' });
  });
});
