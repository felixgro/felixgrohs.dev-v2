import { useState, useEffect } from 'preact/hooks';

let UUID = 0;

const useUid = () => {
    const [uid] = useState(`__${UUID}__`);

    UUID++;

    return uid;
}

export default useUid;