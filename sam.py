import matplotlib.pyplot as plt
import subprocess

# Run git log command to get commit history
git_log = subprocess.run(['git', 'log', '--pretty=format:%h %ad', '--date=short'], capture_output=True, text=True)
output = git_log.stdout

# Split the output into commits and dates
commits = []
dates = []
for line in output.split('\n'):
    if line.strip():
        commit, date = line.split()
        commits.append(commit)
        dates.append(date)

# Plotting the graph
plt.figure(figsize=(10, 6))
plt.plot(dates, commits, marker='o')
plt.title('Git Project Commits Over Time')
plt.xlabel('Date')
plt.ylabel('Commit Hash')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
