interface DataRow extends File {}

interface Props {
  headings: string[];
  data: DataRow[];
  className?: string;
}

const Table = (props: Props) => {
  return (
    <div
      className={`${props.className} h-full overflow-auto border-2 rounded-xl max-h-48`}
    >
      <table className="table table-compact h-full w-full text-sm">
        <thead>
          <tr>
            <th>Index</th>
            {props.headings.map((item) => (
              <th>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => (
            <tr>
              <th>{index}</th>
              <td>{item.name}</td>
              <td>{item.size}</td>
            </tr>
          ))}

          {props.data.length <= 3 && (
            <>
              <tr>
                <th></th>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th></th>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th></th>
                <td></td>
                <td></td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
