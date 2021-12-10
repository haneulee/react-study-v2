import { Button } from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useHistory } from "react-router";

const BackButton = function () {
  const history = useHistory();

  return (
    <Button
      leftIcon={<IoMdArrowRoundBack />}
      onClick={() => history.goBack()}
      style={{ position: "absolute", left: "0", top: "0" }}
    >
      Back
    </Button>
  );
};

export default BackButton;
