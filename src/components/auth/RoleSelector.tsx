import "./RoleSelector.css";

interface Props {
  selectedRole: string;
  onChange: (role: string) => void;
}

const RoleSelector = ({ selectedRole, onChange }: Props) => {
  const roles = ["Super Admin", "Vendor Admin", "Operator"];

  return (
    <div className="role-selector">
      {roles.map((role) => (
        <button
          key={role}
          type="button" //Important: to prevent form submission when used inside a form
          className={selectedRole === role ? "role-btn active" : "role-btn"}
          onClick={() => onChange(role)}
        >
          {role}
        </button>
      ))}
    </div>
  );
};

export default RoleSelector;