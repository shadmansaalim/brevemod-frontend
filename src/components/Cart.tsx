// Imports
import { ICourse } from "@/interfaces/common";

const Cart = (props: {
  cart: {
    courses: ICourse[];
    payment: {
      subTotal: number;
      tax: number;
      grandTotal: number;
    };
  };
}) => {
  const { courses, payment } = props.cart;
  return (
    <ul className="list-group mb-3">
      {courses.map((course) => (
        <li
          key={course._id}
          className="list-group-item d-flex justify-content-between lh-sm"
        >
          <div>
            <p className="my-0">
              <small>{course.title}</small>
            </p>
          </div>
          <span className="text-muted ms-4">${course.price}</span>
        </li>
      ))}

      <li className="list-group-item d-flex justify-content-between align-items-center">
        <div className="text-dark">
          <h6 className="my-0">Sub total</h6>
        </div>
        <span className="text-dark"> ${payment.subTotal}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <div className="text-dark">
          <h6 className="my-0"> Tax</h6>
        </div>
        <span className="text-dark"> ${payment.tax}</span>
      </li>
      <li className="list-group-item bg-dark text-white d-flex justify-content-between">
        <span>Total (USD)</span>
        <strong>${payment.grandTotal}</strong>
      </li>
    </ul>
  );
};

export default Cart;
