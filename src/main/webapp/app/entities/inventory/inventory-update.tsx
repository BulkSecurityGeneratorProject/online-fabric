import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPlayer } from 'app/shared/model/player.model';
import { getEntities as getPlayers } from 'app/entities/player/player.reducer';
import { getEntity, updateEntity, createEntity, reset } from './inventory.reducer';
import { IInventory } from 'app/shared/model/inventory.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInventoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IInventoryUpdateState {
  isNew: boolean;
  playerId: string;
}

export class InventoryUpdate extends React.Component<IInventoryUpdateProps, IInventoryUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      playerId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getPlayers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { inventoryEntity } = this.props;
      const entity = {
        ...inventoryEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/inventory');
  };

  render() {
    const { inventoryEntity, players, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="onlineFabricApp.inventory.home.createOrEditLabel">Create or edit a Inventory</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : inventoryEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="inventory-id">ID</Label>
                    <AvInput id="inventory-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="typeLabel" for="inventory-type">
                    Type
                  </Label>
                  <AvField
                    id="inventory-type"
                    type="text"
                    name="type"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      minLength: { value: 3, errorMessage: 'This field is required to be at least 3 characters.' },
                      maxLength: { value: 64, errorMessage: 'This field cannot be longer than 64 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="settingsLabel" for="inventory-settings">
                    Settings
                  </Label>
                  <AvField id="inventory-settings" type="text" name="settings" />
                </AvGroup>
                <AvGroup>
                  <Label for="inventory-player">Player</Label>
                  <AvInput id="inventory-player" type="select" className="form-control" name="player.id">
                    <option value="" key="0" />
                    {players
                      ? players.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/inventory" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  players: storeState.player.entities,
  inventoryEntity: storeState.inventory.entity,
  loading: storeState.inventory.loading,
  updating: storeState.inventory.updating,
  updateSuccess: storeState.inventory.updateSuccess
});

const mapDispatchToProps = {
  getPlayers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryUpdate);
