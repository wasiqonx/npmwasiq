#!/usr/bin/env node
2const http = require("http");
3
4http.get("http://213.210.20.16:8080/resume.json", res => {
5  let data = "";
6
7  res.on("data", chunk => {
8    data += chunk;
9  });
10
11  res.on("end", () => {
12    const r = JSON.parse(data);
13
14    let output = `${r.name || r.full_name || "Unknown"}
15${r.current_title || ""}
16
17${r.summary || ""}
18`;
19
20    if (r.experience?.length) {
21      output += `\nExperience\n`;
22      r.experience.forEach(exp => {
23        output += `- ${exp.title} at ${exp.company}`;
24        if (exp.start || exp.end) {
25          output += ` (${exp.start || ""} - ${exp.end || ""})`;
26        }
27        output += `\n`;
28      });
29    }
30
31    if (r.contact) {
32      output += `\nContact\n`;
33      if (r.contact.email) output += `- Email: ${r.contact.email}\n`;
34      if (r.contact.location) output += `- Location: ${r.contact.location}\n`;
35    }
36
37    if (r.links) {
38      output += `\nLinks\n`;
39      Object.entries(r.links).forEach(([k, v]) => {
40        output += `- ${k}: ${v}\n`;
41      });
42    }
43
44    console.log(output);
45  });
46}).on("error", () => {
47  console.log("Unable to fetch resume.");
48});
