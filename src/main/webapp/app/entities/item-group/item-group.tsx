import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './item-group.reducer';
import { IItemGroup } from 'app/shared/model/item-group.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IItemGroupProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ItemGroup extends React.Component<IItemGroupProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { itemGroupList, match } = this.props;
    return (
      <div>
        <h2 id="item-group-heading">
          Item Groups
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Item Group
          </Link>
        </h2>
        <div className="table-responsive">
          {itemGroupList && itemGroupList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {itemGroupList.map((itemGroup, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${itemGroup.id}`} color="link" size="sm">
                        {itemGroup.id}
                      </Button>
                    </td>
                    <td>{itemGroup.name}</td>
                    <td>{itemGroup.description}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${itemGroup.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${itemGroup.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${itemGroup.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Item Groups found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ itemGroup }: IRootState) => ({
  itemGroupList: itemGroup.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemGroup);
