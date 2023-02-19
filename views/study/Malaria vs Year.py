import pandas as pd
import matplotlib.pyplot as plt
import mpld3


data = pd.read_csv("Copy File.csv", low_memory=False)

# Replace "Cancer" with the specific disease you want to plot
disease_name = "Malaria"

# Create a figure for each disease
figures = []
disease_data = data[data["Diseases"] == disease_name]

# Count the occurrences of the disease and create a new DataFrame
disease_counts = disease_data["Date"].value_counts(ascending=False).rename_axis("Years").to_frame("counts")

# Extract the x and y values for the bar chart
x = disease_counts.index.tolist()
y = disease_counts["counts"].tolist()

fig, ax = plt.subplots()
ax.bar(x, y)
ax.set_title(disease_name + " Cases over the year ")
figures.append(fig)


disease_data2 = data[data["Diseases"] == disease_name]
disease_counts2 = disease_data2["Severity"].value_counts(ascending=False).rename_axis("Severity").to_frame("counts")
x2 = disease_counts2.index.tolist()
y2 = disease_counts2["counts"].tolist()

fig2 = plt.figure(figsize=(10, 5))
plt.pie(y2, labels=x2, autopct='%1.2f%%')
plt.title("Severity levels of " + disease_name)
plt.axis('off')
figures.append(fig2)

disease_data3 = data[data["Diseases"] == disease_name]
disease_counts3 = disease_data3["State"].value_counts(ascending=False).rename_axis("State").to_frame("counts")

x3 = disease_counts3.index.tolist()
y3 = disease_counts3["counts"].tolist()

fig3 = plt.figure(figsize=(8, 8))
plt.pie(y3, labels=x3, autopct='%1.2f%%')
plt.title("Impact on different states")
plt.axis('off')
figures.append(fig3)

# Combine the HTML code for each figure into a single HTML page
html_code = "<html><body>"
for fig in figures:
    html_code += mpld3.fig_to_html(fig) + "<br><br>"
html_code += "</body></html>"

# Save the HTML code to a file
with open("malaria.html", "w") as f:
    f.write(html_code)