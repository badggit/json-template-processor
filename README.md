Done - Task 1: Fix the most important JSON template processor problems
Done - Task 2: Make JSON processor UI better
Done - Task 3: Implement the JSON gallery
Done - Task 4: Implement for loops in the JSON processor
Partly done - Task 5: Improve error handling:
- Lost variables from the template are collected into a variable and displayed, but only in the console. Again, it’s not difficult to output this information elsewhere, it just requires time.
- The user can see the line and location of the error from the error message, but the cursor doesn’t move there, and the fields aren’t highlighted in red. This can be done, but the protocol would need to be a bit more complex, and there wasn’t enough time to implement it.
  Done - Task 6: Something else:
- ESLint+Prettier added
- Pre-defined Templates
- User Variables

Changes I would make:
1. Check the JSON format before sending it to the server.
2. Probably it's better to use useTransition instead of useActionState because it doesn’t reset the entire form (see: https://react.dev/reference/rsc/server-actions#composing-server-actions-with-actions). But since you wrote about it, I used it.
3. In my opinion, it's better to move JSON parsing to action.ts and implement a process like processTemplate(template: object, variables: object). Alternatively, we could move all checks to templateProcessor.ts.
4. I suggest adding an error-handling protocol to the processTemplate function rather than always returning default text fields.
5. Probably enable auto-sizing for text areas.
6. Add JSON format button for text area

More tests in tests.png

### If template example
Template: ``` {"data": {"$if": "{{showData}}", "value": "secret"}} ```

Variables: ``` { "showData": false } ```

Output: ``` {} ```

### Complex template example
Template:
```
    {
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
    }
```
Variables:
``` 
{
  "companyName": "TechCorp",
  "depts": [
    {
      "name": "Engineering",
      "manager": "Alice",
      "hasEmployees": true,
      "employees": [
        {
          "name": "Bob",
          "position": "Developer",
          "fullTime": true
        },
        {
          "name": "Charlie",
          "position": "Designer",
          "fullTime": false
        }
      ]
    },
    {
      "name": "Marketing",
      "manager": "David",
      "hasEmployees": false
    }
  ]
}
```

Output:
```
 {
  "company": "TechCorp",
  "departments": [
    {
      "name": "Engineering",
      "manager": "Alice",
      "employees": [
        {
          "name": "Bob",
          "position": "Developer",
          "isFullTime": {
            "value": true
          }
        },
        {
          "name": "Charlie",
          "position": "Designer"
        }
      ]
    },
    {
      "name": "Marketing",
      "manager": "David"
    }
  ]
}
```
