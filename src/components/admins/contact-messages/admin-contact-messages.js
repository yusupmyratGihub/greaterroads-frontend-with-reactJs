import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { getMessagesByPage } from "../../../api/contact-service";
import Loading from "../../common/loading/loading";

const columns = [
  {
    name: "Subject",
    selector: (row) => row.subject,
  },
  {
    name: "Visitor",
    selector: (row) => row.name,
  },
];

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = async (page) => {
    try {
      const resp = await getMessagesByPage(page, perPage);
      setMessages(resp.data.content);
      setTotalRows(resp.data.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    // Data table componenti 1 tabanlı, bizim api 0 tabanlı çalıştığı için 1 eksiltip gönderiyoruz
    loadData(page - 1);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    loadData(page - 1);
    setPerPage(newPerPage);
  };

  const handleRowClick = (row) => {
    navigate(`/admin/contact-messages/${row.id}`);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <DataTable
        columns={columns}
        data={messages}
        progressPending={loading}
        progressComponent={<Loading />}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        onRowClicked={handleRowClick}
      />
    </div>
  );
};

export default AdminContactMessages;
