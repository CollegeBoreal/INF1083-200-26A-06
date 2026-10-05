# Setup

## :a: Class - INF1083-200-26A-06 - Introduction à l'administration des systèmes

```
https://${LMS_URL}/course/view.php?id=8
```

## :b: Assignments for:

- [ ] courseids[0]=8

- [ ] Retrieve all assignments from LMS

```bash
curl -X POST "https://${LMS_URL}/webservice/rest/server.php" \
-d "wstoken=${API_SYNC_TOKEN}" \
-d "wsfunction=mod_assign_get_assignments" \
-d "moodlewsrestformat=json" \
-d "courseids[0]=8" | jq '.courses[].assignments[] | {id, cmid, name}'
```
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1704    0  1587  100   117   2463    181 --:--:-- --:--:-- --:--:--  2645
```
<details><summary>📑</summary>

```json
{
  "id": 52,
  "cmid": 59,
  "name": "0.PlanDeCours"
}
```

</details>

## :x: Error

When copying a course this error will occur when the assignement is duplicated. To fix the issue just manually try to grade the assignment. That will reset the grading.

```bash
curl -X POST "https://moodle.valiha.com/webservice/rest/server.php" \
  -d "wstoken=${API_SYNC_TOKEN}" \
  -d "wsfunction=core_grades_get_gradable_users" \
  -d "moodlewsrestformat=json" \
  -d "courseid=9" | jq '.'
```
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   240    0   123  100   117    283    269 --:--:-- --:--:-- --:--:--   552
```
```lua
{
  "exception": "core\\exception\\moodle_exception",
  "errorcode": "gradesneedregrading",
  "message": "grades/gradesneedregrading"
}
```

