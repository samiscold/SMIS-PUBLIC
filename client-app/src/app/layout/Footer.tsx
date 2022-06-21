import React from "react"

const Footer = () => <footer className="bg-light text-muted page-footer font-small blue pt-4  mt-auto">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">UBT SMIS</h5>
                <p>UBT-SMIS is a student managment platform.</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            {/* <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Links</h5>
                <ul className="list-unstyled">
                    <li><a href="#!">Link 1</a></li>
                    <li><a href="#!">Link 2</a></li>
                    <li><a href="#!">Link 3</a></li>
                    <li><a href="#!">Link 4</a></li>
                </ul>
            </div> */}

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Crud Links</h5>
                <ul className="list-unstyled">
                    <li><a href="/createDepartment">Create Department</a></li>
                    <li><a href="/createCountry">Create Country</a></li>
                </ul>
            </div>
        </div>
    </div>


    <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
    © 2022 Copyright:
    <a className="text-reset fw-bold" href="#"> ubt-smis.com</a>
  </div>
</footer>
export default Footer