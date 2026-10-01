# Setup

## :a: LMS Assignment ID = 52

```
https://${LMS_URL}/mod/assign/view.php?id=52
```

```json
{
  "id": 52,                // Assignment ID
  "cmid": 59,              // Rubric Definition CMID
  "name": "0.PlanDeCours". // Assignment name
}
```

## :b: Rubric Definition for

- [ ] cmids[0]=59

- [ ] Retrieve all rubric definitions from LMS

```bash
curl -X POST "https://${LMS_URL}/webservice/rest/server.php" \
-d "wstoken=${API_SYNC_TOKEN}" \
-d "wsfunction=core_grading_get_definitions" \
-d "moodlewsrestformat=json" \
-d "cmids[0]=59" \
-d "areaname=submissions" | jq .
```
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  2397    0  2261  100   136   3849    231 --:--:-- --:--:-- --:--:--  4076
```
<details><summary>📑</summary>

```json
{
  "areas": [
    {
      "cmid": 59,
      "contextid": 628,
      "component": "mod_assign",
      "areaname": "submissions",
      "activemethod": "rubric",
      "definitions": [
        {
          "id": 51,
          "method": "rubric",
          "name": "Participation",
          "description": "Plan De Cours",
          "descriptionformat": 1,
          "status": 20,
          "copiedfromid": null,
          "timecreated": 1790436802,
          "usercreated": 2,
          "timemodified": 1790436802,
          "usermodified": 2,
          "timecopied": 0,
          "rubric": {
            "rubric_criteria": [
              {
                "id": 230,
                "sortorder": 1,
                "description": "README.md",
                "descriptionformat": 1,
                "levels": [
                  {
                    "id": 557,
                    "score": 0,
                    "definition": "❌",
                    "definitionformat": 1
                  },
                  {
                    "id": 558,
                    "score": 1,
                    "definition": "🥈",
                    "definitionformat": 1
                  },
                  {
                    "id": 559,
                    "score": 2,
                    "definition": "🥇",
                    "definitionformat": 1
                  }
                ]
              },
              {
                "id": 231,
                "sortorder": 2,
                "description": "images",
                "descriptionformat": 1,
                "levels": [
                  {
                    "id": 560,
                    "score": 0,
                    "definition": "❌",
                    "definitionformat": 1
                  },
                  {
                    "id": 561,
                    "score": 1,
                    "definition": "✔️",
                    "definitionformat": 1
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  ],
  "warnings": []
}

```

</details>