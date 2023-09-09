import MarkdownEditor from "@/components/MarkdownEditor/MarkdownEditor";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ticketActions } from "@/redux/slices/ticket.slice";

function Step2() {

    const dispatch = useAppDispatch();
    const ticketState = useAppSelector(x => x.ticket);


    return <div>
        <MarkdownEditor
            value={ticketState.description}
            onChange={value => dispatch(ticketActions.setDescription(value))} />
    </div>
}

export default Step2;