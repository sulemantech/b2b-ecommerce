// import Breadcrumb from '../components/Breadcrumb';
import TableThree from '../components/TableThree';
import TableTwo from '../components/TableTwo';
import TableFour from '../components/TableFour';

const Tables = () => {
  return (
    <>
      {/* <Breadcrumb pageName="Tables" /> */}

      <div className="flex flex-col gap-10">
        <TableFour/>
        {/* <TableOne /> */}
        <TableTwo />
        <TableThree />

      </div>
    </>
  );
};

export default Tables;
