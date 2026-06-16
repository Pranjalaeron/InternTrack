export default function ApplicationTable({
applications,
onDelete,
onStatusChange,
}) {
return ( <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden"> <table className="w-full"> <thead className="bg-zinc-800"> <tr> <th className="text-left p-4">Company</th> <th className="text-left p-4">Role</th> <th className="text-left p-4">Status</th> <th className="text-left p-4">Deadline</th> <th className="text-left p-4">Notes</th> <th className="text-left p-4">Actions</th> </tr> </thead>


    <tbody>
      {applications.length === 0 ? (
        <tr>
          <td
            colSpan="6"
            className="text-center p-8 text-zinc-400"
          >
            You haven't added any applications yet.
          </td>
        </tr>
      ) : (
        applications.map((app) => (
          <tr
            key={app._id}
            className="border-t border-zinc-800"
          >
            <td className="p-4 font-medium">
              {app.company}
            </td>

            <td className="p-4">
              {app.role}
            </td>

            <td className="p-4">
              <select
                value={app.status}
                onChange={(e) =>
                  onStatusChange(
                    app._id,
                    e.target.value,
                  )
                }
                className="bg-zinc-800 px-3 py-2 rounded-lg"
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </td>

            <td className="p-4">
              {app.deadline
                ? new Date(app.deadline)
                    .toISOString()
                    .split("T")[0]
                : "N/A"}
            </td>

            <td className="p-4 max-w-xs">
              {app.notes ? (
                <p className="text-zinc-300 text-sm break-words">
                  {app.notes}
                </p>
              ) : (
                <p className="text-zinc-500 text-sm italic">
                  No notes
                </p>
              )}
            </td>

            <td className="p-4">
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this application?",
                    )
                  ) {
                    onDelete(app._id);
                  }
                }}
                className="
                bg-red-500
                hover:bg-red-600
                px-3
                py-2
                rounded-lg
                transition
              "
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>


);
}
