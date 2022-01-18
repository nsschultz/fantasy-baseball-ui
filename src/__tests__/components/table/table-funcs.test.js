import { getAlign } from '../../../components/table/table-funcs';

describe('Tables Funcs', () => { 
  it('should get correct alignment for null', () => { expect(getAlign({})).toEqual('left'); });

  it('should get correct alignment for numeric', () => { expect(getAlign({ type: 'numeric' })).toEqual('right'); });
  
  it('should get correct alignment for string', () => { expect(getAlign({ type: 'string' })).toEqual('left'); });
});