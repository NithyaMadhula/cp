//Rules
import rules from '../../../utils/rules/rules';
import check from '../../../utils/permissions/check';

//Takes in props that determine if a user can see the view. Returns yes or no.
const CanShow = props =>
  check(rules, props.role, props.perform, props.data)
    ? props.yes()
    : props.no();

CanShow.defaultProps = {
  yes: () => null,
  no: () => null
};

export default CanShow;
