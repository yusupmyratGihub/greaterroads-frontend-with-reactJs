import fileDownload from "js-file-download";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { downloadUsers, getUsersByPage } from "../../../api/user-service";
import Loading from "../../common/loading/loading";

const columns = [
  {
    name: "First Name",
    selector: (row) => row.firstName,
  },
  {
    name: "Last Name",
    selector: (row) => row.lastName,
  },
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "Roles",
    selector: (row) => row.roles,
  },
];

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const navigate = useNavigate();

  const loadData = async (page) => {
    setLoading(true);
    try {
      const resp = await getUsersByPage(page, perPage);
      setUsers(resp.data.content);
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

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const resp = await downloadUsers();
      fileDownload(resp.data, `users-${new Date().valueOf()}.xlsx`);
    } catch (err) {
      console.log(err);
    } finally {
      setDownloading(false);
    }
  };

  const handleRowClick = (row) => {
    navigate(`/admin/users/${row.id}`);
  };

  useEffect(() => {
    loadData(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Button
        variant="secondary"
        onClick={handleDownload}
        disabled={downloading}
      >
        {downloading && <Spinner animation="border" size="sm" />} Download Users
      </Button>

      <DataTable
        columns={columns}
        data={users}
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

export default AdminUsers;
