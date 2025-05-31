export const exportCsv = (data, filename) => {
	const csvContent = data.map((row) => row.join(",")).join("\n")
	const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
	const url = URL.createObjectURL(blob)
	const a = document.createElement("a")
	a.href = url
	a.download = filename
	a.style.visibility = "hidden"
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
	URL.revokeObjectURL(url)
}
