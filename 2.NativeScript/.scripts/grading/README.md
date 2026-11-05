# Setup

## :zero: Class - INF1102-201-26H-03 - Programmation de systèmes

- [ ] courseids[0]=8

```
https://${LMS_URL}/course/view.php?id=8
```

## :one: LMS Assignment ID = 66

```json
{
  "id": 66,
  "cmid": 76,
  "name": "2.NativeScript"
}
```

## :two: Rubric Definition CMID = 48

```bash
curl -X POST "https://${LMS_URL}/webservice/rest/server.php" \
-d "wstoken=${API_SYNC_TOKEN}" \
-d "wsfunction=core_grading_get_definitions" \
-d "moodlewsrestformat=json" \
-d "cmids[0]=76" \
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
      "cmid": 76,
      "contextid": 783,
      "component": "mod_assign",
      "areaname": "submissions",
      "activemethod": "rubric",
      "definitions": [
        {
          "id": 65,
          "method": "rubric",
          "name": "Participation",
          "description": "2.NativeScript",
          "descriptionformat": 1,
          "status": 20,
          "copiedfromid": null,
          "timecreated": 1793887270,
          "usercreated": 3,
          "timemodified": 1793887439,
          "usermodified": 3,
          "timecopied": 0,
          "rubric": {
            "rubric_criteria": [
              {
                "id": 268,
                "sortorder": 1,
                "description": "README.md",
                "descriptionformat": 1,
                "levels": [
                  {
                    "id": 677,
                    "score": 0,
                    "definition": "❌",
                    "definitionformat": 1
                  },
                  {
                    "id": 678,
                    "score": 1,
                    "definition": "🥈",
                    "definitionformat": 1
                  },
                  {
                    "id": 679,
                    "score": 2,
                    "definition": "🥇",
                    "definitionformat": 1
                  }
                ]
              },
              {
                "id": 269,
                "sortorder": 2,
                "description": "images",
                "descriptionformat": 1,
                "levels": [
                  {
                    "id": 680,
                    "score": 0,
                    "definition": "❌",
                    "definitionformat": 1
                  },
                  {
                    "id": 681,
                    "score": 1,
                    "definition": "✔️",
                    "definitionformat": 1
                  }
                ]
              },
              {
                "id": 270,
                "sortorder": 3,
                "description": "Appréciation",
                "descriptionformat": 1,
                "levels": [
                  {
                    "id": 682,
                    "score": 0,
                    "definition": "❌",
                    "definitionformat": 1
                  },
                  {
                    "id": 683,
                    "score": 1,
                    "definition": "🥉",
                    "definitionformat": 1
                  },
                  {
                    "id": 684,
                    "score": 2,
                    "definition": "🥈",
                    "definitionformat": 1
                  },
                  {
                    "id": 685,
                    "score": 3,
                    "definition": "🥇",
                    "definitionformat": 1
                  },
                  {
                    "id": 686,
                    "score": 4,
                    "definition": "🏆",
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
